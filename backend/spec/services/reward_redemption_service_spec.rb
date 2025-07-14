# frozen_string_literal: true

require 'rails_helper'

RSpec.describe RewardRedemptionService do
  let(:user) { create(:user, points: 100) }
  let(:reward) { create(:reward, cost: 50) }
  let(:service) { described_class.new(user, reward.id) }

  describe '#call' do
    context 'when user has enough points' do
      it 'creates a redemption and deducts user points' do
        expect { service.call }.to change(Redemption, :count).by(1)

        expect(user.reload.points).to eq(50)
      end

      it 'returns a Redemption object' do
        redemption = service.call

        expect(redemption).to be_a(Redemption)
        expect(redemption.user).to eq(user)
        expect(redemption.reward).to eq(reward)
      end
    end

    context 'when user has insufficient points' do
      let(:reward) { create(:reward, cost: 200) }

      it 'raises NotEnoughPoints when user lacks points' do
        expect { service.call }.to raise_error(RewardRedemptionService::NotEnoughPoints)
      end
    end

    context 'when reward does not exist' do
      let(:service) { described_class.new(user, 99_999) }
      it 'raises RewardNotFound when reward does not exist' do
        expect { service.call }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end
end
