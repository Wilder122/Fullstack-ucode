/* 1: Get all heroes with their commands (NULL if there is no command) */
SELECT h.name AS Hero, t.name AS Team
FROM heroes h
LEFT JOIN heroes_teams ht ON h.id = ht.hero_id
LEFT JOIN teams t ON ht.team_id = t.id;

/* 2: Get all the heroes with their powers (all powers must be listed, even if no one has them) */
SELECT h.name AS Hero, p.name AS Power
FROM powers p
LEFT JOIN heroes_powers hp ON p.id = hp.power_id
LEFT JOIN heroes h ON hp.hero_id = h.id;

/* 3: Getting heroes with their powers and teams (only those with both) */
SELECT h.name AS Hero, p.name AS Power, t.name AS Team
FROM heroes h
JOIN heroes_powers hp ON h.id = hp.hero_id
JOIN powers p ON hp.power_id = p.id
JOIN heroes_teams ht ON h.id = ht.hero_id
JOIN teams t ON ht.team_id = t.id;
