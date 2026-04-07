package com.wardrobe.backend.config;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class TagsJsonMigration {

    private final JdbcTemplate jdbcTemplate;

    @PostConstruct
    public void migrateTagsColumn() {
        List<String> columnTypes = jdbcTemplate.query(
            """
            SELECT data_type
            FROM information_schema.columns
            WHERE table_name = 'clothing_items' AND column_name = 'tags'
            """,
                (resultSet, rowNum) -> resultSet.getString("data_type")
        );

        if (columnTypes.isEmpty()) {
            return;
        }

        String columnType = columnTypes.getFirst();
        if ("jsonb".equalsIgnoreCase(columnType)) {
            return;
        }

        jdbcTemplate.execute("""
                ALTER TABLE clothing_items
                    ALTER COLUMN tags TYPE jsonb
                    USING CASE
                        WHEN tags IS NULL OR btrim(tags) = '' THEN '[]'::jsonb
                        WHEN left(ltrim(tags), 1) = '[' THEN tags::jsonb
                        ELSE to_jsonb(regexp_split_to_array(tags, '\\s*,\\s*'))
                    END
                """);
    }
}