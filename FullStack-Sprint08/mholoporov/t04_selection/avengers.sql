/* 1. Choose the most powerful hero (sum of all attack and defense abilities) */
SELECT h.name AS Hero, 
       COALESCE(SUM(CASE WHEN p.type = 'attack' THEN hp.power_points ELSE 0 END), 0) +
       COALESCE(SUM(CASE WHEN p.type = 'defense' THEN hp.power_points ELSE 0 END), 0) AS Total_Power
FROM heroes h
JOIN heroes_powers hp ON h.id = hp.hero_id
JOIN powers p ON hp.power_id = p.id
GROUP BY h.id, h.name
ORDER BY Total_Power DESC, h.id ASC
LIMIT 1;

/* 2. Choose the weakest hero (lowest sum of all defensive abilities) */
SELECT h.name AS Hero, 
       COALESCE(SUM(CASE WHEN p.type = 'defense' THEN hp.power_points ELSE 0 END), 0) AS Total_Defense
FROM heroes h
JOIN heroes_powers hp ON h.id = hp.hero_id
JOIN powers p ON hp.power_id = p.id
GROUP BY h.id, h.name
ORDER BY Total_Defense ASC
LIMIT 1;

/* 3. Select all the heroes from the Avengers team (except double agent) and sort by total power output */
SELECT h.name AS Hero,
       COALESCE(SUM(CASE WHEN p.type = 'attack' THEN hp.power_points ELSE 0 END), 0) +
       COALESCE(SUM(CASE WHEN p.type = 'defense' THEN hp.power_points ELSE 0 END), 0) AS Total_Power
FROM heroes h
JOIN heroes_teams ht ON h.id = ht.hero_id
JOIN teams t ON ht.team_id = t.id
JOIN heroes_powers hp ON h.id = hp.hero_id
JOIN powers p ON hp.power_id = p.id
WHERE t.name = 'Avengers'
  AND h.name != 'Double Agent' /* replace by the name of the double agent, if known */
GROUP BY h.id, h.name
ORDER BY Total_Power DESC;

/* 4. Get the total power of the Avengers and Hydra teams and sort the teams by power */
SELECT t.name AS Team, 
       COALESCE(SUM(CASE WHEN p.type = 'attack' THEN hp.power_points ELSE 0 END), 0) +
       COALESCE(SUM(CASE WHEN p.type = 'defense' THEN hp.power_points ELSE 0 END), 0) AS Total_Power
FROM heroes h
JOIN heroes_teams ht ON h.id = ht.hero_id
JOIN teams t ON ht.team_id = t.id
JOIN heroes_powers hp ON h.id = hp.hero_id
JOIN powers p ON hp.power_id = p.id
WHERE t.name IN ('Avengers', 'Hydra')
GROUP BY t.id, t.name
ORDER BY Total_Power ASC;
