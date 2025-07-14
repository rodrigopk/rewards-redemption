# frozen_string_literal: true

require 'swagger_helper'

RSpec.describe 'Rewards API', swagger_doc: 'v1/swagger.yaml', type: :request do
  path '/api/v1/rewards' do
    get 'Retrieve a list of available rewards' do
      tags 'Rewards'
      produces 'application/json'
      security [bearerAuth: []]

      response '200', 'authenticated user' do
        let(:user) { create(:user, password: 'password123') }
        let!(:rewards) { create_list(:reward, 3) }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: user.id)}" }

        run_test! do |response|
          json = JSON.parse(response.body)
          expect(json.length).to eq(3)
          expect(json.first).to include('title', 'cost')
        end
      end

      response '401', 'unauthorized' do
        let(:Authorization) { nil }

        run_test! do |response|
          json = JSON.parse(response.body)
          expect(json['error']).to eq('Unauthorized')
        end
      end
    end
  end
end
