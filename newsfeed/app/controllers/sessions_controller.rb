class SessionsController < ApplicationController
  skip_before_action :require_login!, only: [:create, :new, :destroy]
  def create
    @user = User.find_by_credentials(session_params)
    if @user
      signin(@user)
      redirect_to root_url
    else
      flash[:errors] = 'lululululululululululululul'
      redirect_to :back
    end
  end

  def new
  end

  def destroy
    signout
    redirect_to new_session_url
  end

  private
    def session_params
      params.require(:user).permit(:username, :password)
    end
end
