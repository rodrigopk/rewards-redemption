# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :redemptions, dependent: :destroy

  validates :name, :email, presence: true

  def to_serialized
    {
      id: id,
      name: name,
      email: email,
      points: points
    }
  end
end
