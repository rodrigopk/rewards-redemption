# frozen_string_literal: true

# Clear old data
Rails.logger.debug '🌪️ Cleaning up...'
Redemption.delete_all
Reward.delete_all
User.delete_all

# Create users
Rails.logger.debug '🧑 Creating users...'
users = User.create!([
                       { name: 'Rodrigo', email: 'rodrigopk@gmail.com', password: 'password123', points: 150 },
                       { name: 'Bilbo', email: 'bilbo.baggins@shire.com', password: 'password123', points: 100 },
                       { name: 'Ziggy', email: 'ziggy@stardust.com', password: 'password123', points: 30 }
                     ])

# Create rewards
Rails.logger.debug '🎁 Creating rewards...'
rewards = Reward.create!([
                           { title: 'Free Coffee', description: '1 large premium coffee', cost: 50 },
                           { title: '10% Off Coupon', description: '10% off your next order', cost: 20 },
                           { title: 'Movie Ticket', description: '1 free movie pass', cost: 100 }
                         ])

# Create redemptions
Rails.logger.debug '🧾 Creating redemptions...'
Redemption.create!([
                     { user: users[0], reward: rewards[0] },
                     { user: users[1], reward: rewards[1] },
                     { user: users[0], reward: rewards[2] }
                   ])

Rails.logger.debug '✅ Seeding complete!'
