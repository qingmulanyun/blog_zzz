namespace :data_fix do
  desc 'add default value for first_name and last_name of user model'
  task default_name: :environment do
    counter = 0
    User. where("first_name is ? or last_name is ?", nil , nil).each do |user|
      p "update user info for #{user.email}."
      user.first_name = 'New'
      user.last_name = 'Member'
      user.save!
      counter += 1
    end
    p "update #{counter} record#{counter > 1 ? 's.' : '.'}"
  end
end
