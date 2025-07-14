# frozen_string_literal: true

class ApplicationController < ActionController::API
  attr_reader :current_user

  protected

  def authenticate_user!
    header = request.headers['Authorization']
    header = header.split.last if header.present?

    decoded = JsonWebToken.decode(header)
    @current_user = User.find_by(id: decoded[:user_id]) if decoded

    render json: { error: 'Unauthorized' }, status: :unauthorized unless @current_user
  end
end
