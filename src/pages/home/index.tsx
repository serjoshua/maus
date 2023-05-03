import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="container">
      <div className="fs-2 fw-bold">Introduction to IMPC Embryo Data</div>
      <p>
        Up to one third of homozygous knockout lines are lethal, which means no
        homozygous mice or less than expected are observed past the weaning
        stage (IMPC&thinsp;
        <a
          href="https://www.mousephenotype.org/impress/ProcedureInfo?action=list&procID=703&pipeID=7"
          target="_blank"
          rel="noopener noreferrer"
        >
          Viability Primary Screen procedure
        </a>
        ). Early death may occur during embryonic development or soon after
        birth, during the pre-weaning stage. For this reason, the IMPC
        established a&thinsp;
        <a
          href="https://www.mousephenotype.org/impress"
          target="_blank"
          rel="noopener noreferrer"
        >
          systematic embryonic phenotyping pipeline
        </a>
        &thinsp;to morphologically evaluate mutant embryos to ascertain the
        primary perturbations that cause early death and thus gain insight into
        gene function.
      </p>
      <p>
        As determined in IMPReSS (see interactive diagram&thinsp;
        <a
          href="https://www.mousephenotype.org/impress"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
        ), all embryonic lethal lines undergo gross morphology assessment at
        E12.5 (embryonic day 12.5) to determine whether defects occur earlier or
        later during embryonic development. A comprehensive imaging platform is
        then used to assess dysmorphology. Embryo gross morphology, as well as
        2D and 3D imaging are actively being implemented by the IMPC for lethal
        lines.
      </p>
      <p>
        Read more in our paper on&thinsp;
        <a
          href="https://europepmc.org/article/PMC/5295821"
          target="_blank"
          rel="noopener noreferrer"
        >
          High-throughput discovery of novel developmental phenotypes, Nature
          2016.
        </a>
      </p>
      <div className="fs-2 fw-bold">Accessing Embryo Phenotype Data</div>
      <p>Embryo phenotype data can be accessed in multiple ways:</p>
      <ul>
        <li>
          <Link to="/heatmap">Embryo Images: interactive heatmap</Link>
          &thinsp;- A compilation of all our Embryo Images, organised by gene
          and life stage, with access to the Interactive Embryo Viewer, where
          you can compare mutants and wild types side by side and rotate 2D and
          3D images; we also provide access to our external partners' embryo
          images.
        </li>
        <li>
          <Link to="/vignettes">Embryo Vignettes</Link>
          &thinsp;- Showcase of best embryo images with detailed explanations.
        </li>
        <li>
          From the FTP site, latest release All our results. Reports need to be
          filtered by a dedicated column, Life Stage (E9.5, E12.5, E15.5 and
          E18.5). Please check the README file or see documentation&thinsp;
          <a
            href="https://www.mousephenotype.org/help/non-programmatic-data-access/"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </li>
        <li>
          Using the REST API (see documentation&thinsp;
          <a
            href="https://www.mousephenotype.org/help/programmatic-data-access/"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          )
        </li>
      </ul>
      <div className="fs-2 fw-bold">Determining Lethal Lines</div>
      <p>
        The IMPC assesses each gene knockout line for viability (Viability
        Primary Screen&thinsp;
        <a
          href="https://www.mousephenotype.org/impress/ProcedureInfo?action=list&procID=703&pipeID=7"
          target="_blank"
          rel="noopener noreferrer"
        >
          IMPC_VIA_001
        </a>
        ). In this procedure, the proportion of homozygous pups is determined
        soon after birth, during the preweaning stage, in litters produced from
        mating heterozygous animals. A line is declared lethal if no homozygous
        pups for the null allele are detected at weaning age, and subviable if
        pups homozygous for the null allele constitute less than 12.5% of the
        litter.
      </p>
      <p>
        Lethal strains are further phenotyped in the&thinsp;
        <a
          href="https://www.mousephenotype.org/impress"
          target="_blank"
          rel="noopener noreferrer"
        >
          embryonic phenotyping pipeline
        </a>
        . For embryonic lethal and subviable strains, heterozygotes are
        phenotyped in the IMPC&thinsp;
        <a
          href="https://www.mousephenotype.org/impress"
          target="_blank"
          rel="noopener noreferrer"
        >
          adult phenotyping pipeline
        </a>
        .
      </p>
    </main>
  );
}