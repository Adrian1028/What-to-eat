"use client";

import { Button, Text, Stack, Paper, Group } from "@mantine/core";
import type { FoodCategory } from "@/lib/food-categories";

interface SpinResultProps {
  category: FoodCategory;
  coords: { lat: number; lng: number } | null;
  onSpinAgain: () => void;
  onSearchNearby: () => void;
}

export default function SpinResult({
  category,
  coords,
  onSpinAgain,
  onSearchNearby,
}: SpinResultProps) {
  const isHomeCooking = category.id === "cookhome";

  // Deep link to Google Maps / Apple Maps search
  const mapsUrl = coords
    ? `https://www.google.com/maps/search/${encodeURIComponent(category.searchKeyword)}/@${coords.lat},${coords.lng},15z`
    : null;

  return (
    <Paper
      shadow="xl"
      radius="lg"
      p="xl"
      style={{
        background: category.color,
        color: category.textColor,
        textAlign: "center",
        maxWidth: 340,
        width: "100%",
      }}
    >
      <Stack align="center" gap="md">
        <Text style={{ fontSize: "3rem", lineHeight: 1 }}>
          {category.emoji}
        </Text>
        <Text fw={900} size="xl">
          今天吃{category.label}！
        </Text>

        {isHomeCooking ? (
          <Text size="sm" style={{ opacity: 0.9 }}>
            回家自己動手做吧！省錢又健康 💪
          </Text>
        ) : (
          <Group gap="sm" justify="center">
            {mapsUrl && (
              <Button
                component="a"
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="white"
                color="dark"
                size="sm"
                radius="xl"
              >
                📍 開啟地圖搜尋
              </Button>
            )}
            <Button
              variant="white"
              color="dark"
              size="sm"
              radius="xl"
              onClick={onSearchNearby}
            >
              🔍 找附近餐廳
            </Button>
          </Group>
        )}

        <Button
          variant="subtle"
          color={category.textColor === "#FFFFFF" ? "gray.0" : "dark"}
          size="sm"
          onClick={onSpinAgain}
          style={{ marginTop: 4 }}
        >
          🎰 再轉一次
        </Button>
      </Stack>
    </Paper>
  );
}
