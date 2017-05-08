class PasswordsController < Devise::PasswordsController
  layout 'sign_in'
  before_action :check_params, only:[:create]

  def check_params
    flash[:alert] = I18n.t("falure.NoEmail") if params[:email].blank?
  end
end