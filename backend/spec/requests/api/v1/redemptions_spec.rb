# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'User Redemption History API', type: :request do
  let(:user) { create(:user, password: 'password123') }
  let(:other_user) { create(:user, password: 'password123') }
  let(:rewards) { create_list(:reward, 2) }
  let(:token) { JsonWebToken.encode(user_id: user.id) }

  let!(:redemptions) do
    [
      create(:redemption, user: user, reward: rewards[0], created_at: 1.day.ago),
      create(:redemption, user: user, reward: rewards[1], created_at: 2.days.ago)
    ]
  end

  describe 'GET /api/v1/users/:id/redemptions' do
    before do
      get '/api/v1/redemptions', headers: headers
    end

    context 'when authorized' do
      let(:headers) do
        {
          'Authorization' => "Bearer #{token}",
          'Content-Type' => 'application/json',
          'Accept' => 'application/json'
        }
      end

      it 'returns the user\'s redemptions' do
        expect(response).to have_http_status(:ok)

        json = response.parsed_body
        expect(json.size).to eq(2)
        expect(json.first['reward']).to include('title')
        expect(json.first).to include('redeemed_at')
      end
    end

    context 'when unauthenticated' do
      let(:headers) { {} }

      it 'returns unauthorized' do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'POST /api/v1/redemptions' do
    let(:reward) { rewards.first }

    context 'when authenticated' do
      let(:headers) do
        token = JsonWebToken.encode(user_id: user.id)
        {
          'Authorization' => "Bearer #{token}",
          'Content-Type' => 'application/json',
          'Accept' => 'application/json'
        }
      end

      context 'when user has enough points' do
        it 'creates a redemption and deducts points' do
          expect do
            post '/api/v1/redemptions',
                 headers: headers,
                 params: { reward_id: reward.id }.to_json
          end.to change(Redemption, :count).by(1)

          expect(response).to have_http_status(:created)

          json = response.parsed_body
          expect(json['redemption']['reward']['id']).to eq(reward.id)
        end
      end

      context 'when user has insufficient points' do
        let(:expensive_reward) { create(:reward, cost: 200) }

        it 'returns unprocessable entity' do
          post '/api/v1/redemptions',
               headers: headers,
               params: { reward_id: expensive_reward.id }.to_json

          expect(response).to have_http_status(:unprocessable_entity)
          expect(response.parsed_body['error']).to eq('Insufficient points')
        end
      end

      context 'when reward does not exist' do
        it 'returns not found' do
          post '/api/v1/redemptions',
               headers: headers,
               params: { reward_id: 9999 }.to_json

          expect(response).to have_http_status(:not_found)
        end
      end
    end

    context 'when unauthenticated' do
      it 'returns unauthorized' do
        post '/api/v1/redemptions', params: { reward_id: reward.id }.to_json

        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
