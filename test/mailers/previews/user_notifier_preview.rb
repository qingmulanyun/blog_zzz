# Preview all emails at http://localhost:3000/rails/mailers/user_notifier
class UserNotifierPreview < ActionMailer::Preview
  def send_sign_up_email
    user = User.last
    UserNotifier.send_sign_up_email(user)
  end
end
