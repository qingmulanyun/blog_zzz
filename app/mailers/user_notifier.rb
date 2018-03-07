class UserNotifier < ApplicationMailer
  default :from => 'Alexandra@wala.com'

  def send_sign_up_email(user)
    @user = user
    mail(
        to: @user.email,
        subject:  'Thanks for signing up for Wala.')
  end
end
