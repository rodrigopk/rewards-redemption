# frozen_string_literal: true

require 'swagger_helper'

RSpec.describe 'Redemptions API', swagger_doc: 'v1/swagger.yaml', type: :request do
  path '/api/v1/redemptions' do
    get 'List redemption history for the current user' do
      tags 'Redemptions'
      produces 'application/json'
      security [bearerAuth: []]

      response '200', 'user is authenticated' do
        let(:user) { create(:user, password: 'password123') }
        let(:rewards) { create_list(:reward, 2) }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: user.id)}" }

        before do
          create(:redemption, user: user, reward: rewards[0], created_at: 1.day.ago)
          create(:redemption, user: user, reward: rewards[1], created_at: 2.days.ago)
        end

        run_test! do |response|
          json = JSON.parse(response.body)
          expect(json.size).to eq(2)
          expect(json.first['reward']).to include('title')
          expect(json.first).to include('redeemed_at')
        end
      end

      response '401', 'unauthenticated' do
        let(:Authorization) { nil }

        run_test!
      end
    end
  end

  path '/api/v1/redemptions' do
    post 'Redeem a reward for the current user' do
      tags 'Redemptions'
      consumes 'application/json'
      produces 'application/json'
      security [bearerAuth: []]

      parameter name: :reward_id, in: :body, schema: {
        type: :object,
        required: ['reward_id'],
        properties: {
          reward_id: { type: :integer }
        }
      }

      response '201', 'redemption successful' do
        let(:user) { create(:user, points: 100, password: 'password123') }
        let(:reward) { create(:reward, cost: 50) }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: user.id)}" }
        let(:reward_id) { { reward_id: reward.id } }

        run_test! do |response|
          json = JSON.parse(response.body)
          expect(json['redemption']['reward']['id']).to eq(reward.id)
        end
      end

      response '422', 'insufficient points' do
        let(:user) { create(:user, points: 10, password: 'password123') }
        let(:reward) { create(:reward, cost: 50) }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: user.id)}" }
        let(:reward_id) { { reward_id: reward.id } }

        run_test!
      end

      response '404', 'reward not found' do
        let(:user) { create(:user, password: 'password123') }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: user.id)}" }
        let(:reward_id) { { reward_id: 9999 } }

        run_test!
      end

      response '401', 'unauthenticated' do
        let(:Authorization) { nil }
        let(:reward_id) { { reward_id: 1 } }

        run_test!
      end
    end
  end
end
