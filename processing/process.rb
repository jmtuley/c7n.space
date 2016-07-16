#! /usr/bin/env ruby

require 'json'

groups = Hash.new { |h, k| h[k] = [] }

def contraction(word)
  word = word.downcase
  "#{word[0]}#{word.length - 2}#{word[-1]}"
end

ARGF.each do |line|
  line = line.chomp
  next if line.length < 4
  groups[contraction(line)] << line
end

groups.each do |contraction, list|
  blob = JSON.generate(
      {
          key: contraction,
          words: list,
      }
  )

  IO.write("en/#{contraction}.json", blob)
end
