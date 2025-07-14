# frozen_string_literal: true

require 'swagger_helper'

RSpec.describe 'Current User Points API', swagger_doc: 'v1/swagger.yaml', type: :request do
  path '/api/v1/points' do
    get 'Retrieve the current user’s points balance' do
      tags 'User'
      produces 'application/json'
      security [bearerAuth: []]

      response '200', 'authenticated user' do
        let(:user) { create(:user, points: 120) }
        let(:Authorization) { "Bearer #{JsonWebToken.encode(user_id: user.id)}" }

        run_test! do |response|
          json = JSON.parse(response.body)
          expect(json['user_id']).to eq(user.id)
          expect(json['points']).to eq(user.points)
        end
      end

      response '401', 'unauthorized' do
        let(:Authorization) { nil }

        run_test! do |response|
          expect(response.status).to eq(401)
        end
      end
    end
  end
end
