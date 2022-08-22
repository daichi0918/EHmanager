# frozen_string_literal: true

5.times do |n|
  user = User.new(
    name: "User_#{n}",
    email: "example#{n}@example.co.jp",
    encrypted_password: "password#{n}"
  )

  12.times do |m|
    user.lists.build(
      name: "samplelist#{m}"
    )
  end

  user.save!
end
