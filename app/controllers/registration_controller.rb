class RegistrationController < Devise::RegistrationsController
  def create
    super do |resource|
      UserNotifier.send_sign_up_email(resource).deliver
    end
  end
end
