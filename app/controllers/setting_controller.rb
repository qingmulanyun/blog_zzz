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

  def addresses_index
    authorize :setting, :addresses_index?
    render json: { addresses: current_user.addresses.order(is_primary: :desc) }
  end

  def create_address
    authorize :setting, :create_address?
    Address.transaction do
      current_user.primary_address&.dis_primary if address_params[:is_primary].eql?('true')
      current_user.addresses.create!(address_params)
    end
    render json: { addresses: current_user.addresses.order(is_primary: :desc) }
  end

  private

  def update_profile_param
    params.require(:user).permit(:name, :phone)
  end

  def address_params
    params.require(:address).permit(:country, :province, :city, :area, :address_line_1, :receiver_name, :receiver_phone, :is_primary)
  end
end
