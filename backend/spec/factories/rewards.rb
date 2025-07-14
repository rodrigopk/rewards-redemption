# frozen_string_literal: true

FactoryBot.define do
  factory :reward do
    title { 'Free Coffee' }
    description { 'One free large coffee' }
    cost { 50 }
  end
end
