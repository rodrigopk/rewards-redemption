# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Reward, type: :model do
  it { should have_many(:redemptions).dependent(:destroy) }

  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:cost) }

  context 'validations' do
    context 'cost' do
      it 'is valid with a positive cost' do
        reward = build(:reward, cost: 100)
        expect(reward).to be_valid
      end

      it 'is invalid with a non-numeric cost' do
        reward = build(:reward, cost: 'invalid')
        expect(reward.valid?).to be false
      end

      it 'is invalid with a negative cost' do
        reward = build(:reward, cost: -10)
        expect(reward.valid?).to be false
      end
    end
  end

  describe '#to_serialized' do
    let(:reward) { create(:reward) }

    it 'returns a serialized representation of the reward' do
      expected_serialized = {
        id: reward.id,
        title: reward.title,
        description: reward.description,
        cost: reward.cost
      }

      expect(reward.to_serialized).to eq(expected_serialized)
    end
  end
end
