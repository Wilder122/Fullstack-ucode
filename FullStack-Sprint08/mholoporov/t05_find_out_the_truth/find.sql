SELECT h.id, h.name, h.class_role
FROM heroes h
JOIN heroes_teams ht ON h.id = ht.hero_id
JOIN teams t ON ht.team_id = t.id
JOIN races r ON h.race_id = r.id
WHERE r.name != 'Human'
  AND h.name LIKE '%a%'
  AND h.class_role IN ('tankman', 'healer')
GROUP BY h.id, h.name, h.class_role
HAVING COUNT(DISTINCT t.id) >= 2
ORDER BY h.id ASC
LIMIT 1;
