3.times do |n|
  user = User.new(
    name: "TestUser_#{n}",
    email: "sample#{n}@example.co.jp",
    encrypted_password: "password#{n}"
  )

  4.times do |m|
    user.lists.build(
      name: "list#{m}"
    )
  end

  user.save!
end
