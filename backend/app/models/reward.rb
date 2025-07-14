# frozen_string_literal: true

class Reward < ApplicationRecord
  has_many :redemptions, dependent: :destroy

  validates :title, :cost, presence: true
  validates :cost, numericality: { greater_than: 0 }
end
