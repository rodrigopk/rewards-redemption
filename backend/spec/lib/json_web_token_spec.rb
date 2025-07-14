# frozen_string_literal: true
require 'rails_helper'

RSpec.describe JsonWebToken do
  let(:payload) { { user_id: 42 } }
  let(:token) { described_class.encode(payload) }

  describe '.encode' do
    it 'returns a JWT token string' do
      expect(token).to be_a(String)
    end
  end

  describe '.decode' do
    it 'returns the original payload' do
      decoded = described_class.decode(token)
      
      expect(decoded[:user_id]).to eq(payload[:user_id])
    end

    it 'returns nil for an invalid token' do
      bad_token = token + 'corrupted'
      
      expect(described_class.decode(bad_token)).to be_nil
    end

    it 'returns nil for an expired token' do
      expired_token = described_class.encode(payload, 1.second.ago)
      
      sleep 1
      
      expect(described_class.decode(expired_token)).to be_nil
    end
  end
end