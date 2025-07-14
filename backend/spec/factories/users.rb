# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    name { 'Bilbo' }
    email { 'bilbo.baggins@shire.com' }
    points { 100 }
  end
end
