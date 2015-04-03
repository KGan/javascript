class Api::UserFeedsController < ApplicationController
  def create
    @userfeed = UserFeed.new(user_feed_params)
    if @userfeed.save
      render json: {success: 'success!'}, status: 200
    else
      render json: @userfeed.errors.full_messages, status: 422
    end
  end

  def destroy
  end

  private
    def user_feed_params
      {user_id: current_user.id, feed_id: params[:feed_id]}
    end
end
