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
end
