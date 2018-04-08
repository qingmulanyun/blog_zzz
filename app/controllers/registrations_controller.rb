class RegistrationsController < Devise::RegistrationsController
  layout 'sign_up', only: [:new]

  def create
    super do |resource|
      UserNotifier.send_sign_up_email(resource).deliver_later
    end
  end
end
