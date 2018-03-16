class RegistrationsController < Devise::RegistrationsController
  layout 'sign_up', only: [:create]

  def create
    super do |resource|
      UserNotifier.send_sign_up_email(resource).deliver
    end
  end
end
