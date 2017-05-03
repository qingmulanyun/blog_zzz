if Rails.env.development?

  ActionMailer::Base.delivery_method = :smtp
  ActionMailer::Base.smtp_settings = {
      address:              'smtp.gmail.com',
      port:                 587,
      domain:               'blogzzz.herokuapp.com',
      user_name:             'alexandrahigherone@gmail.com',
      password:              'Alexandra1',
      authentication:       'plain',
      enable_starttls_auto: true
  }
elsif Rails.env.production?
  ActionMailer::Base.delivery_method = :smtp
  ActionMailer::Base.smtp_settings = {
      address:              'smtp.gmail.com',
      port:                 587,
      domain:               'blogzzz.herokuapp.com',
      user_name:             'alexandrahigherone@gmail.com',
      password:              'Alexandra1',
      authentication:       'plain',
      enable_starttls_auto: true
  }
end
