# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Rewards API', type: :request do
  let(:user) { create(:user, password: 'password123') }
  let!(:rewards) { create_list(:reward, 3) }
  let(:token) { JsonWebToken.encode(user_id: user.id) }

  describe 'GET /api/v1/rewards' do
    before do
      get '/api/v1/rewards', headers: headers
    end

    context 'when user is authenticated' do
      let(:headers) do
        {
          'Authorization' => "Bearer #{token}",
          'Content-Type' => 'application/json',
          'Accept' => 'application/json'
        }
      end

      it 'returns all rewards' do
        expect(response).to have_http_status(:ok)

        json = response.parsed_body
        expect(json.length).to eq(3)
        expect(json.first).to have_key('title')
        expect(json.first).to have_key('cost')
      end
    end

    context 'when user is not authenticated' do
      let(:headers) { {} }

      it 'returns unauthorized' do
        expect(response).to have_http_status(:unauthorized)

        json = response.parsed_body
        expect(json['error']).to eq('Unauthorized')
      end
    end
  end
end
