package com.wardrobe.backend.config;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ImageUrlTextMigration {

    private final JdbcTemplate jdbcTemplate;

    @PostConstruct
    public void migrateImageUrlColumn() {
        List<String> columnTypes = jdbcTemplate.query(
                """
                SELECT data_type
                FROM information_schema.columns
                WHERE table_name = 'clothing_items' AND column_name = 'image_url'
                """,
                (resultSet, rowNum) -> resultSet.getString("data_type")
        );

        if (columnTypes.isEmpty()) {
            return;
        }

        String columnType = columnTypes.getFirst();
        if (!"oid".equalsIgnoreCase(columnType)) {
            return;
        }

        jdbcTemplate.execute("""
                ALTER TABLE clothing_items
                    ALTER COLUMN image_url TYPE text
                    USING CASE
                        WHEN image_url IS NULL THEN NULL
                        ELSE convert_from(lo_get(image_url), 'UTF8')
                    END
                """);
    }
}
