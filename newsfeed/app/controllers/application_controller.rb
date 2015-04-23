class ApplicationController < ActionController::Base
  protect_from_forgery
  helper_method :current_user, :logged_in?
  before_action :require_login!, except: [:current_user, :logged_in?, :signin, :signout]

  def current_user
    @current_user ||= User.find_by_session_token(session[:token])
  end

  def logged_in?
    !!current_user
  end

  def signin(user)
    @current_user = user
    session[:token] = current_user.reset_session_token!
  end

  def signout
    current_user && current_user.reset_session_token!
  end

  def require_login!
    redirect_to new_session_url unless logged_in?
  end
end
