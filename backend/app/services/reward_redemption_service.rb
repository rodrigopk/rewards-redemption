# frozen_string_literal: true

class RewardRedemptionService
  class NotEnoughPoints < StandardError; end

  def initialize(user, reward_id)
    @user = user
    @reward_id = reward_id
  end

  def call
    reward = Reward.find(@reward_id)

    raise NotEnoughPoints, 'Insufficient points' if @user.points < reward.cost

    ActiveRecord::Base.transaction do
      @user.update!(points: @user.points - reward.cost)
      Redemption.create!(user: @user, reward: reward)
    end
  end
end
