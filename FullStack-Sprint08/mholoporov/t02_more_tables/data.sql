INSERT INTO races (name) VALUES 
('Human'), 
('Kree'), 
('Asgardian');

UPDATE heroes SET race_id = (SELECT id FROM races WHERE name = 'Human') WHERE name IN ('Iron Man', 'Black Widow');
UPDATE heroes SET race_id = (SELECT id FROM races WHERE name = 'Asgardian') WHERE name = 'Thor';
UPDATE heroes SET race_id = (SELECT id FROM races WHERE name = 'Kree') WHERE name = 'Captain Marvel';

INSERT INTO powers (name, type) VALUES 
('bloody fist', 'attack'),
('iron shield', 'defense'),
('super strength', 'attack'),
('healing factor', 'defense');

INSERT INTO heroes_powers (hero_id, power_id, power_points) VALUES
((SELECT id FROM heroes WHERE name = 'Iron Man'), (SELECT id FROM powers WHERE name = 'iron shield'), 200),
((SELECT id FROM heroes WHERE name = 'Thor'), (SELECT id FROM powers WHERE name = 'super strength'), 150),
((SELECT id FROM heroes WHERE name = 'Hulk'), (SELECT id FROM powers WHERE name = 'super strength'), 180),
((SELECT id FROM heroes WHERE name = 'Black Widow'), (SELECT id FROM powers WHERE name = 'bloody fist'), 110);

INSERT INTO teams (name) VALUES 
('Avengers'), 
('Hydra');

INSERT INTO heroes_teams (hero_id, team_id) VALUES
((SELECT id FROM heroes WHERE name = 'Iron Man'), (SELECT id FROM teams WHERE name = 'Avengers')),
((SELECT id FROM heroes WHERE name = 'Thor'), (SELECT id FROM teams WHERE name = 'Avengers')),
((SELECT id FROM heroes WHERE name = 'Black Widow'), (SELECT id FROM teams WHERE name = 'Hydra')),
((SELECT id FROM heroes WHERE name = 'Hulk'), (SELECT id FROM teams WHERE name = 'Hydra')),
((SELECT id FROM heroes WHERE name = 'Captain America'), (SELECT id FROM teams WHERE name = 'Avengers'));