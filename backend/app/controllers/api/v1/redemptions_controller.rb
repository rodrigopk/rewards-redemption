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
        render json: { redemption: redemption.to_serialized }, status: :created
      rescue ActiveRecord::RecordNotFound, ::RewardRedemptionService::NotEnoughPoints, StandardError => e
        handle_redemption_error(e)
      end

      private

      def handle_redemption_error(error)
        case error
        when ActiveRecord::RecordNotFound
          render json: { error: error.message }, status: :not_found
        when ::RewardRedemptionService::NotEnoughPoints
          render json: { error: error.message }, status: :unprocessable_entity
        when StandardError
          render json: { error: error.message }, status: :internal_server_error
        end
      end

      def redemption_params
        params.permit(:reward_id)
      end
    end
  end
end
