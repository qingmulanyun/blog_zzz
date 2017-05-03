if Rails.env.development?

  ActionMailer::Base.delivery_method = :smtp
  ActionMailer::Base.smtp_settings = {
      address:              'smtp.gmail.com',
      port:                 587,
      domain:               'blogzzz.herokuapp.com',
      user_name:             ENV["EMAIL_SENDING_USER_NAME"],
      password:              ENV["EMAIL_SENDING_PASS"],
      authentication:       'plain',
      enable_starttls_auto: true
  }
elsif Rails.env.production?
  ActionMailer::Base.delivery_method = :smtp
  ActionMailer::Base.smtp_settings = {
      address:              'smtp.gmail.com',
      port:                 587,
      domain:               'blogzzz.herokuapp.com',
      user_name:             ENV["EMAIL_SENDING_USER_NAME"],
      password:              ENV["EMAIL_SENDING_PASS"],
      authentication:       'plain',
      enable_starttls_auto: true
  }
end
