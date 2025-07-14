# frozen_string_literal: true

class User < ApplicationRecord
  has_many :redemptions, dependent: :destroy

  validates :name, :email, presence: true
end
