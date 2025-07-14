# frozen_string_literal: true

require 'swagger_helper'

RSpec.describe 'Auth API', swagger_doc: 'v1/swagger.yaml', type: :request do
  path '/api/v1/auth/sign_in' do
    post 'Sign in a user and return a JWT token' do
      tags 'Authentication'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :credentials, in: :body, schema: {
        type: :object,
        required: %w[email password],
        properties: {
          email: { type: :string },
          password: { type: :string }
        }
      }

      let(:Authorization) { nil } # Authorization header is not required for sign-in

      response '200', 'valid credentials' do
        let(:user) { create(:user, password: 'password123') }

        let(:credentials) do
          {
            email: user.email,
            password: 'password123'
          }
        end

        run_test! do |response|
          json = JSON.parse(response.body)
          expect(json['token']).to be_present
          expect(json['user']['email']).to eq(user.email)
        end
      end

      response '401', 'invalid credentials' do
        let(:user) { create(:user, password: 'password123') }

        let(:credentials) do
          {
            email: user.email,
            password: 'wrongpassword'
          }
        end

        run_test! do |response|
          json = JSON.parse(response.body)
          expect(json['error']).to eq('Invalid email or password')
        end
      end
    end
  end
end
