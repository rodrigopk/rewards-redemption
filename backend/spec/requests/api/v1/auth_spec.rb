# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Auth API', type: :request do
  let!(:user) { create(:user, password: 'password123') }

  describe 'POST /api/v1/auth/sign_in' do
    before do
      post '/api/v1/auth/sign_in', params: params
    end

    context 'with valid credentials' do
      let(:params) { { email: user.email, password: 'password123' } }
      it 'returns a JWT token and user info' do
        expect(response).to have_http_status(:ok)

        json = response.parsed_body
        expect(json['token']).to be_present
        expect(json['user']['email']).to eq(user.email)
      end
    end

    context 'with invalid credentials' do
      let(:params) { { email: user.email, password: 'wrongpassword' } }
      it 'returns unauthorized' do
        expect(response).to have_http_status(:unauthorized)

        json = response.parsed_body
        expect(json['error']).to eq('Invalid email or password')
      end
    end
  end
end
