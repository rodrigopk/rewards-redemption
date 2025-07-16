# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Redemption, type: :model do
  it { should belong_to(:user) }
  it { should belong_to(:reward) }

  describe '#to_serialized' do
    let(:user) { create(:user) }
    let(:reward) { create(:reward) }
    let(:redemption) { create(:redemption, user: user, reward: reward) }

    it 'returns a serialized representation of the redemption' do
      expected_serialized = {
        id: redemption.id,
        user_id: user.id,
        redeemed_at: redemption.created_at,
        reward: redemption.reward.to_serialized
      }

      expect(redemption.to_serialized).to eq(expected_serialized)
    end
  end
end
