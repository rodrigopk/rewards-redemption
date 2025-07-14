# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Current User Points API', type: :request do
  let(:user) { create(:user, points: 120) }
  let(:token) { JsonWebToken.encode(user_id: user.id) }

  describe 'GET /api/v1/points' do
    before do
      get '/api/v1/points', headers: headers
    end

    context 'when authenticated' do
      let(:headers) do
        {
          'Authorization' => "Bearer #{token}",
          'Content-Type' => 'application/json',
          'Accept' => 'application/json'
        }
      end

      it 'returns the current user\'s point balance' do
        expect(response).to have_http_status(:ok)

        json = response.parsed_body
        expect(json['user_id']).to eq(user.id)
        expect(json['points']).to eq(user.points)
      end
    end

    context 'when unauthenticated' do
      let(:headers) { {} }

      it 'returns unauthorized' do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
