# frozen_string_literal: true

class Redemption < ApplicationRecord
  belongs_to :user
  belongs_to :reward

  def to_serialized
    {
      id: id,
      user_id: user_id,
      redeemed_at: created_at,
      reward: {
        id: reward.id,
        title: reward.title,
        description: reward.description,
        cost: reward.cost
      }
    }
  end
end
