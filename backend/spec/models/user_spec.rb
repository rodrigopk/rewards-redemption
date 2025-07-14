# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  it { should have_many(:redemptions).dependent(:destroy) }

  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:email) }
  it { should validate_uniqueness_of(:email).case_insensitive }

  it 'has default points' do
    user = create(:user, points: 50)

    expect(user.points).to eq(50)
  end

  describe '#to_serialized' do
    let(:user) { create(:user) }

    it 'returns a serialized representation of the user' do
      expected_serialized = {
        id: user.id,
        name: user.name,
        email: user.email,
        points: user.points
      }

      expect(user.to_serialized).to eq(expected_serialized)
    end
  end
end
