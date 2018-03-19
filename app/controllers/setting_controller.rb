class SettingController < ApplicationController

  def profile
    authorize :setting, :profile?
  #   todo default setting page
  end

  def profile_info
    authorize :setting, :profile_info?
    current_user
    render json: {status: 200, profile_info: current_user}
  end

  def update_profile_info
    authorize :setting, :update_profile_info?
    current_user.update_attributes!(update_profile_param)
    render json: {status: 200, profile_info: current_user}
  end

  private

  def update_profile_param
    params.require(:user).permit(:name, :phone)
  end
end
