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
end
