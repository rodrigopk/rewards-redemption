# frozen_string_literal: true

module Api
  module V1
    class RedemptionsController < ApplicationController
      before_action :authenticate_user!

      def index
        redemptions = current_user.redemptions.includes(:reward).order(created_at: :desc)

        render json: redemptions.map(&:to_serialized), status: :ok
      end

      def create
        redemption = ::RewardRedemptionService.new(current_user, redemption_params[:reward_id]).call

        render json: {
          redemption: redemption.to_serialized,
          remaining_points: current_user.points
        }, status: :created
      rescue ActiveRecord::RecordNotFound => e
        render json: { error: e.message }, status: :not_found
      rescue ::RewardRedemptionService::NotEnoughPoints => e
        render json: { error: e.message }, status: :unprocessable_entity
      rescue StandardError => e
        render json: { error: e.message }, status: :internal_server_error
      end

      private

      def redemption_params
        params.permit(:reward_id)
      end
    end
  end
end
