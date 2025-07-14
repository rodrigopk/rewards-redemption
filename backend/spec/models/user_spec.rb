# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  it { should have_many(:redemptions).dependent(:destroy) }

  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:email) }

  it 'has default points' do
    user = create(:user, points: 50)

    expect(user.points).to eq(50)
  end
end
