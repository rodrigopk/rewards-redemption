# frozen_string_literal: true

module Api
  module V1
    class RewardsController < ApplicationController
      before_action :authenticate_user!

      def index
        rewards = Reward.all

        render json: rewards.map(&:to_serialized), status: :ok
      end
    end
  end
end
