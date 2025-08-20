# HeatmapChart

## Overview

The HeatmapChart component is a powerful data visualization tool designed for displaying matrix data where values are represented as colors in a grid format. Built on ECharts, it's specifically optimized for scientific applications including gene expression analysis, correlation matrices, and other high-density datasets. The component supports advanced features like zooming, camera viewports for large datasets, and extensive customization options.

## Installation & Import

```tsx
import { HeatmapChart } from '@czi-sds/data-viz';
```

## Props

| Prop Name | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| data | `OptionSourceData` | ✓ | - | The data array to be visualized. Must be consistent with the `encode` option |
| xAxisData | `CategoryAxisData` | ✓ | - | The data for the x axis (e.g., `[{ value: "gene1" }, "gene2", "gene3"]`) |
| yAxisData | `CategoryAxisData` | ✓ | - | The data for the y axis (e.g., `[{ value: "cellType1" }, "cellType2", "cellType3"]`) |
| width | `number` | ✓ | - | The width of the chart in pixels |
| height | `number` | ✓ | - | The height of the chart in pixels |
| encode | `{ x: string; y: string; }` | - | - | Mapping of data keys to x/y axis encoding |
| symbol | `"circle" \| "rect" \| "roundRect"` | - | - | The shape of the symbols |
| symbolSize | `number \| number[] \| SymbolSizeCallback` | - | - | Size of the symbols (single number, array, or callback function) |
| itemStyle | `ItemStyleOption` | - | - | Customize the style of each cell item (color, border, opacity, etc.) |
| emphasis | `ScatterStateOption` | - | - | Customize the style when mouse hovers on cells |
| dataZoom | `DataZoomComponentOption[]` | - | - | Zoom functionality for inspecting data in detail |
| camera | `{ active: boolean; height: number; width: number; }` | - | - | Camera viewport for rendering large datasets efficiently |
| grid | `GridOption \| GridOption[]` | - | - | Grid configuration for chart layout |
| axisPointer | `AxisPointerOption` | - | - | Display reference lines under mouse pointer |
| options | `EChartsOption` | - | - | Additional ECharts options for advanced customization |
| onEvents | `Record<string, (event: unknown, chart: EChartsType) => void>` | - | - | Event listeners for chart interactions |
| echartsRendererMode | `"svg" \| "canvas"` | - | - | Rendering mode (SVG for better quality, Canvas for performance) |

## Usage Examples

### Basic Heatmap

```tsx
import React from 'react';
import { HeatmapChart } from '@czi-sds/data-viz';

function BasicHeatmapExample() {
  // Sample gene expression data
  const data = [
    { geneIndex: 0, cellTypeIndex: 0, expression: 0.8 },
    { geneIndex: 1, cellTypeIndex: 0, expression: 0.2 },
    { geneIndex: 0, cellTypeIndex: 1, expression: 0.6 },
    { geneIndex: 1, cellTypeIndex: 1, expression: 0.9 },
    { geneIndex: 2, cellTypeIndex: 0, expression: 0.3 },
    { geneIndex: 2, cellTypeIndex: 1, expression: 0.7 },
  ];

  const genes = ['BRCA1', 'TP53', 'EGFR'];
  const cellTypes = ['T Cell', 'B Cell'];

  return (
    <HeatmapChart
      data={data}
      xAxisData={genes}
      yAxisData={cellTypes}
      width={600}
      height={400}
      encode={{
        x: 'geneIndex',
        y: 'cellTypeIndex'
      }}
      symbol="rect"
      itemStyle={{
        color: (params) => {
          // Color based on expression level
          const value = params.data.expression;
          if (value > 0.7) return '#d32f2f'; // High expression - red
          if (value > 0.4) return '#ff9800'; // Medium expression - orange
          return '#4caf50'; // Low expression - green
        }
      }}
    />
  );
}
```

### Advanced Gene Expression Heatmap

```tsx
import React, { useState } from 'react';
import { HeatmapChart } from '@czi-sds/data-viz';

interface GeneExpressionData {
  gene: number;
  sample: number;
  expression: number;
  pValue?: number;
}

function GeneExpressionHeatmap() {
  const [selectedCell, setSelectedCell] = useState<GeneExpressionData | null>(null);

  // Simulated gene expression data
  const generateExpressionData = (): GeneExpressionData[] => {
    const data: GeneExpressionData[] = [];
    for (let gene = 0; gene < 20; gene++) {
      for (let sample = 0; sample < 10; sample++) {
        data.push({
          gene,
          sample,
          expression: Math.random() * 10, // Expression level 0-10
          pValue: Math.random() * 0.05, // P-value for significance
        });
      }
    }
    return data;
  };

  const data = generateExpressionData();
  const genes = Array.from({ length: 20 }, (_, i) => `Gene_${i + 1}`);
  const samples = Array.from({ length: 10 }, (_, i) => `Sample_${i + 1}`);

  return (
    <div>
      <HeatmapChart
        data={data}
        xAxisData={samples}
        yAxisData={genes}
        width={800}
        height={600}
        encode={{
          x: 'sample',
          y: 'gene'
        }}
        symbol="rect"
        symbolSize={[40, 25]}
        itemStyle={{
          color: (params) => {
            const expression = params.data.expression;
            // Blue-White-Red color scale
            if (expression > 7) return '#b71c1c';
            if (expression > 5) return '#f44336';
            if (expression > 3) return '#ffeb3b';
            if (expression > 1) return '#2196f3';
            return '#0d47a1';
          },
          borderWidth: 1,
          borderColor: '#fff'
        }}
        emphasis={{
          itemStyle: {
            borderColor: '#000',
            borderWidth: 2
          }
        }}
        dataZoom={[
          {
            type: 'slider',
            xAxisIndex: 0,
            start: 0,
            end: 100
          },
          {
            type: 'slider',
            yAxisIndex: 0,
            start: 0,
            end: 100,
            orient: 'vertical'
          }
        ]}
        onEvents={{
          click: (event: any) => {
            setSelectedCell(event.data);
          }
        }}
      />
      
      {selectedCell && (
        <div style={{ 
          marginTop: '16px', 
          padding: '16px', 
          backgroundColor: '#f5f5f5',
          borderRadius: '4px'
        }}>
          <h4>Selected Cell Details</h4>
          <p><strong>Gene:</strong> {genes[selectedCell.gene]}</p>
          <p><strong>Sample:</strong> {samples[selectedCell.sample]}</p>
          <p><strong>Expression Level:</strong> {selectedCell.expression.toFixed(3)}</p>
          <p><strong>P-value:</strong> {selectedCell.pValue?.toFixed(6)}</p>
        </div>
      )}
    </div>
  );
}
```

### Correlation Matrix Heatmap

```tsx
import React from 'react';
import { HeatmapChart } from '@czi-sds/data-viz';

function CorrelationMatrixExample() {
  // Generate correlation matrix data
  const variables = ['Height', 'Weight', 'Age', 'BMI', 'Blood Pressure'];
  const correlationData = [];

  for (let i = 0; i < variables.length; i++) {
    for (let j = 0; j < variables.length; j++) {
      let correlation;
      if (i === j) {
        correlation = 1.0; // Perfect correlation with self
      } else {
        // Simulate realistic correlations
        correlation = (Math.random() - 0.5) * 2; // Range -1 to 1
      }
      
      correlationData.push({
        x: j,
        y: i,
        correlation: correlation
      });
    }
  }

  return (
    <div>
      <h3>Variable Correlation Matrix</h3>
      <HeatmapChart
        data={correlationData}
        xAxisData={variables}
        yAxisData={variables}
        width={500}
        height={500}
        encode={{
          x: 'x',
          y: 'y'
        }}
        symbol="rect"
        symbolSize={[80, 80]}
        itemStyle={{
          color: (params) => {
            const corr = params.data.correlation;
            // Red-White-Blue diverging color scale
            const intensity = Math.abs(corr);
            if (corr > 0.7) return '#b71c1c';
            if (corr > 0.4) return '#f44336';
            if (corr > 0.1) return '#ffcdd2';
            if (corr > -0.1) return '#ffffff';
            if (corr > -0.4) return '#bbdefb';
            if (corr > -0.7) return '#2196f3';
            return '#0d47a1';
          },
          borderWidth: 1,
          borderColor: '#e0e0e0'
        }}
        emphasis={{
          itemStyle: {
            borderColor: '#333',
            borderWidth: 2
          }
        }}
        grid={{
          left: 100,
          top: 50,
          right: 50,
          bottom: 100
        }}
      />
      
      <div style={{ marginTop: '16px', fontSize: '14px' }}>
        <strong>Color Scale:</strong>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: '#0d47a1' }}></div>
          <span>Strong Negative (-1.0)</span>
          <div style={{ width: '20px', height: '20px', backgroundColor: '#ffffff', border: '1px solid #ccc' }}></div>
          <span>No Correlation (0.0)</span>
          <div style={{ width: '20px', height: '20px', backgroundColor: '#b71c1c' }}></div>
          <span>Strong Positive (+1.0)</span>
        </div>
      </div>
    </div>
  );
}
```

### Large Dataset with Camera Viewport

```tsx
import React, { useState } from 'react';
import { HeatmapChart } from '@czi-sds/data-viz';

function LargeDatasetHeatmap() {
  const [cameraActive, setCameraActive] = useState(true);
  const [cameraConfig, setCameraConfig] = useState({
    active: true,
    height: 200,
    width: 300
  });

  // Generate large dataset (100x50 matrix)
  const generateLargeDataset = () => {
    const data = [];
    for (let x = 0; x < 100; x++) {
      for (let y = 0; y < 50; y++) {
        data.push({
          x: x,
          y: y,
          value: Math.random() * 100
        });
      }
    }
    return data;
  };

  const data = generateLargeDataset();
  const xLabels = Array.from({ length: 100 }, (_, i) => `Feature_${i + 1}`);
  const yLabels = Array.from({ length: 50 }, (_, i) => `Sample_${i + 1}`);

  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <h3>Large Dataset Heatmap (100x50 matrix)</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <label>
            <input
              type="checkbox"
              checked={cameraActive}
              onChange={(e) => {
                setCameraActive(e.target.checked);
                setCameraConfig(prev => ({ ...prev, active: e.target.checked }));
              }}
            />
            Enable Camera Viewport
          </label>
          {cameraActive && (
            <>
              <label>
                Width:
                <input
                  type="range"
                  min="200"
                  max="600"
                  value={cameraConfig.width}
                  onChange={(e) => 
                    setCameraConfig(prev => ({ ...prev, width: parseInt(e.target.value) }))
                  }
                />
                {cameraConfig.width}px
              </label>
              <label>
                Height:
                <input
                  type="range"
                  min="150"
                  max="400"
                  value={cameraConfig.height}
                  onChange={(e) => 
                    setCameraConfig(prev => ({ ...prev, height: parseInt(e.target.value) }))
                  }
                />
                {cameraConfig.height}px
              </label>
            </>
          )}
        </div>
      </div>

      <HeatmapChart
        data={data}
        xAxisData={xLabels}
        yAxisData={yLabels}
        width={800}
        height={600}
        encode={{
          x: 'x',
          y: 'y'
        }}
        camera={cameraConfig}
        symbol="rect"
        symbolSize={[8, 12]}
        itemStyle={{
          color: (params) => {
            const value = params.data.value;
            // Viridis-inspired color scale
            if (value > 80) return '#440154';
            if (value > 60) return '#31688e';
            if (value > 40) return '#35b779';
            if (value > 20) return '#fde725';
            return '#ffffff';
          }
        }}
        dataZoom={[
          {
            type: 'slider',
            xAxisIndex: 0,
            start: 0,
            end: 30
          },
          {
            type: 'inside',
            xAxisIndex: 0
          },
          {
            type: 'slider',
            yAxisIndex: 0,
            start: 0,
            end: 40,
            orient: 'vertical'
          },
          {
            type: 'inside',
            yAxisIndex: 0
          }
        ]}
        echartsRendererMode="canvas" // Use canvas for better performance with large datasets
      />
      
      <div style={{ marginTop: '16px', fontSize: '14px' }}>
        <p><strong>Performance Tip:</strong> Camera viewport is {cameraActive ? 'enabled' : 'disabled'}. 
        When enabled, only the visible portion is rendered, improving performance for large datasets.</p>
        <p><strong>Interaction:</strong> Use mouse wheel to zoom, drag to pan, use sliders to navigate.</p>
      </div>
    </div>
  );
}
```

### Interactive Heatmap with Custom Tooltips

```tsx
import React, { useState } from 'react';
import { HeatmapChart } from '@czi-sds/data-viz';

interface ExperimentData {
  treatment: number;
  timePoint: number;
  response: number;
  significance: boolean;
}

function InteractiveHeatmapExample() {
  const [hoveredCell, setHoveredCell] = useState<ExperimentData | null>(null);

  const treatments = ['Control', 'Drug A', 'Drug B', 'Drug C', 'Combination'];
  const timePoints = ['0h', '2h', '6h', '12h', '24h', '48h'];

  // Generate experimental data
  const experimentData: ExperimentData[] = [];
  treatments.forEach((_, treatmentIdx) => {
    timePoints.forEach((_, timeIdx) => {
      const response = Math.random() * 100;
      experimentData.push({
        treatment: treatmentIdx,
        timePoint: timeIdx,
        response: response,
        significance: response > 60 // Arbitrary significance threshold
      });
    });
  });

  return (
    <div>
      <h3>Drug Treatment Response Over Time</h3>
      
      <HeatmapChart
        data={experimentData}
        xAxisData={timePoints}
        yAxisData={treatments}
        width={600}
        height={400}
        encode={{
          x: 'timePoint',
          y: 'treatment'
        }}
        symbol="rect"
        symbolSize={[80, 60]}
        itemStyle={{
          color: (params) => {
            const response = params.data.response;
            const significant = params.data.significance;
            
            // Different color intensity based on response level
            let color;
            if (response > 75) color = '#1b5e20';
            else if (response > 50) color = '#388e3c';
            else if (response > 25) color = '#66bb6a';
            else color = '#c8e6c9';
            
            // Add transparency for non-significant results
            return significant ? color : color + '80';
          },
          borderWidth: 2,
          borderColor: (params) => params.data.significance ? '#ffffff' : '#e0e0e0'
        }}
        emphasis={{
          itemStyle: {
            borderColor: '#333333',
            borderWidth: 3
          }
        }}
        onEvents={{
          mouseover: (event: any) => {
            setHoveredCell(event.data);
          },
          mouseout: () => {
            setHoveredCell(null);
          }
        }}
        options={{
          tooltip: {
            formatter: (params: any) => {
              const data = params.data;
              return `
                <div style="font-size: 12px;">
                  <strong>${treatments[data.treatment]} at ${timePoints[data.timePoint]}</strong><br/>
                  Response: ${data.response.toFixed(1)}%<br/>
                  Significance: ${data.significance ? '✓ Significant' : '✗ Not Significant'}
                </div>
              `;
            }
          }
        }}
      />

      {hoveredCell && (
        <div style={{ 
          marginTop: '16px',
          padding: '12px',
          backgroundColor: hoveredCell.significance ? '#e8f5e8' : '#f5f5f5',
          borderLeft: `4px solid ${hoveredCell.significance ? '#4caf50' : '#999'}`,
          borderRadius: '4px'
        }}>
          <h4>Treatment Details</h4>
          <p><strong>Treatment:</strong> {treatments[hoveredCell.treatment]}</p>
          <p><strong>Time Point:</strong> {timePoints[hoveredCell.timePoint]}</p>
          <p><strong>Response:</strong> {hoveredCell.response.toFixed(1)}%</p>
          <p><strong>Statistical Significance:</strong> {hoveredCell.significance ? 'Yes' : 'No'}</p>
        </div>
      )}

      <div style={{ marginTop: '16px', fontSize: '12px' }}>
        <strong>Legend:</strong>
        <ul>
          <li>Color intensity represents response magnitude</li>
          <li>Solid borders indicate statistically significant results</li>
          <li>Transparent cells with dashed borders are not significant</li>
          <li>Hover over cells for detailed information</li>
        </ul>
      </div>
    </div>
  );
}
```

### With Theme Integration

```tsx
import React from 'react';
import { HeatmapChart } from '@czi-sds/data-viz';
import { getColors } from '@czi-sds/components';
import styled from '@emotion/styled';

const ChartContainer = styled.div`
  ${(props) => {
    const colors = getColors(props);
    return `
      padding: 24px;
      background-color: ${colors?.gray[50]};
      border-radius: 8px;
      border: 1px solid ${colors?.gray[200]};
    `;
  }}
`;

function ThemedHeatmapExample() {
  const data = [
    { x: 0, y: 0, value: 85 },
    { x: 1, y: 0, value: 72 },
    { x: 2, y: 0, value: 91 },
    { x: 0, y: 1, value: 67 },
    { x: 1, y: 1, value: 88 },
    { x: 2, y: 1, value: 76 },
  ];

  return (
    <ChartContainer>
      <h3>Themed Heatmap Chart</h3>
      <HeatmapChart
        data={data}
        xAxisData={['Condition A', 'Condition B', 'Condition C']}
        yAxisData={['Group 1', 'Group 2']}
        width={400}
        height={250}
        encode={{ x: 'x', y: 'y' }}
        symbol="roundRect"
        symbolSize={[100, 80]}
        itemStyle={{
          color: (params) => {
            const value = params.data.value;
            // Use theme-aware colors
            if (value > 85) return '#1976d2';
            if (value > 75) return '#42a5f5';
            if (value > 65) return '#90caf9';
            return '#e3f2fd';
          },
          borderRadius: 4
        }}
      />
    </ChartContainer>
  );
}
```

## Variations

### Symbol Variations

- **rect**: Square/rectangular cells (most common for heatmaps)
- **circle**: Circular symbols for different visual emphasis
- **roundRect**: Rounded rectangular cells for softer appearance

### Renderer Variations

- **canvas**: Better performance for large datasets, suitable for interactive exploration
- **svg**: Higher quality output, better for static displays and printing

## Component States

- **Loading**: Initial rendering state while processing data
- **Interactive**: Full functionality with hover, click, and zoom capabilities
- **Zoomed**: Focused view on specific data regions
- **Camera Mode**: Optimized rendering for large datasets with viewport management

## Best Practices

### When to Use

- Visualizing gene expression matrices or other biological data
- Displaying correlation matrices between variables
- Showing time-series data across multiple conditions
- Representing any 2D data where color intensity conveys meaning
- Creating publication-quality scientific visualizations

### When Not to Use

- For small datasets where tables might be clearer
- When precise numerical values are more important than patterns
- For data that doesn't have a natural 2D structure
- When color accessibility is a primary concern without alternative encoding

### Performance Guidelines

- Use camera viewport for datasets larger than 50x50
- Consider canvas rendering for interactive large datasets
- Implement data pagination or filtering for extremely large datasets
- Use appropriate symbol sizes to balance readability and performance

### Accessibility Guidelines

- Provide alternative text descriptions for screen readers
- Include color scale legends and value ranges
- Consider color-blind friendly palettes
- Offer data export options for non-visual access
- Include keyboard navigation for interactive elements

### Design Guidelines

- Choose color scales appropriate for your data type (sequential, diverging, categorical)
- Maintain consistent spacing and sizing across similar visualizations
- Provide clear axis labels and legends
- Consider the viewing context (screen vs. print) when choosing renderer
- Include meaningful titles and descriptions

### Data Preparation

- Ensure data consistency with encode mapping
- Normalize or scale data appropriately for color representation
- Handle missing values explicitly in your data and styling
- Consider data aggregation for very large datasets
- Validate data ranges match your color scale expectations

## Related Components

- **Icon** - For additional UI elements and controls
- **Button** - For interactive controls and data export
- **Tag** - For labeling different data categories
- **Dropdown** - For selecting different data views or parameters

## API Reference

- [ECharts Heatmap Documentation](https://echarts.apache.org/en/option.html#series-heatmap) - Underlying ECharts configuration options
- [Storybook Stories](link-to-storybook) - Interactive examples and testing
- [Data Visualization Guidelines](../data-viz-guidelines.md) - Best practices for scientific data visualization
- [Color Scale Reference](../color-scales.md) - Recommended color palettes for different data types